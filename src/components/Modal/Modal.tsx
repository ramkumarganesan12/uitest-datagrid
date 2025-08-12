import { useEffect, useRef, type ReactNode } from "react";
import styles from './Modal.module.css';

interface ModalProps {
    children: ReactNode,
    onClose: () => void
}

export const Modal = ({ children, onClose }: ModalProps) => {

    const modalCloseRef = useRef<HTMLButtonElement>(null);

    // Effect to manage keyboard actions
    useEffect(() => {

        modalCloseRef.current?.focus();

        const handleEscapePress = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keydown", handleEscapePress);

        // Cleaning up event listener 
        return () => {
            document.removeEventListener("keydown", handleEscapePress);
        }

    }, [onClose])

    return (
        <div className={styles.modalOverlay}>
            <dialog className={styles.modalContainer} aria-modal="true">
                <button ref={modalCloseRef} className={styles.modalClose} onClick={onClose}>X</button>
                {children}
            </dialog>
        </div>
    )
}