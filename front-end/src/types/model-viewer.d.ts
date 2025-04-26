// src/types/custom-elements.d.ts
declare namespace JSX {
    interface IntrinsicElements {
        'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
            src?: string;
            alt?: string;
            autoRotate?: boolean;
            cameraControls?: boolean;
            ar?: boolean;
            shadowIntensity?: string;
            exposure?: string;
        };
    }
}