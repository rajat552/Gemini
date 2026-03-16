import { useState, useCallback, useEffect, useRef } from 'react';

export const useVoiceInput = (onResult) => {
    const [isListening, setIsListening] = useState(false);
    const [recognition, setRecognition] = useState(null);
    const [error, setError] = useState(null);
    const onResultRef = useRef(onResult);

    useEffect(() => {
        onResultRef.current = onResult;
    }, [onResult]);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = false;
            rec.interimResults = false;
            rec.lang = 'en-US';

            rec.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                if (transcript && onResultRef.current) {
                    onResultRef.current(transcript);
                }
                setIsListening(false);
            };

            rec.onerror = (event) => {
                console.log(`🎤 [Voice Input] Error event fired: ${event.error}`);
                if (event.error !== 'no-speech' && event.error !== 'aborted') {
                    console.error('Speech recognition error event:', event);
                }
                setIsListening(false);
                
                let errorMessage = null;
                switch(event.error) {
                    case 'network':
                        errorMessage = 'Network connection lost.';
                        break;
                    case 'not-allowed':
                    case 'service-not-allowed':
                        errorMessage = 'Microphone access denied.';
                        break;
                    case 'no-speech':
                    case 'aborted':
                        return;
                    case 'audio-capture':
                        errorMessage = 'No microphone found.';
                        break;
                    default:
                        errorMessage = `Error: ${event.error}`;
                }
                
                if (errorMessage) {
                    setError(errorMessage);
                    setTimeout(() => setError(null), 5000);
                }
            };

            rec.onend = () => {
                console.log('🎤 [Voice Input] Listening ended (Microphone turned off).');
                setIsListening(false);
            };

            setRecognition(rec);
        }
    }, []);

    const toggleListening = useCallback(() => {
        setError(null);
        if (!recognition) {
            setError('Speech recognition not supported in this browser.');
            setTimeout(() => setError(null), 5000);
            return;
        }

        if (isListening) {
            recognition.stop();
        } else {
            try {
                console.log('🎤 [Voice Input] Starting to listen...');
                recognition.start();
                setIsListening(true);
            } catch (err) {
                console.error('Failed to start recognition:', err);
                // If it's already started or another error occurs, just reset the state
                setIsListening(false);
            }
        }
    }, [recognition, isListening]);

    return { isListening, toggleListening, isSupported: !!recognition, error };
};
