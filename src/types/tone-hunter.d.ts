// src/types/tone-hunter.d.ts
declare module 'tone-hunter' {
  export const useGetAllColors: (image: HTMLImageElement, step?: number, quantize?: boolean) => { color: string, count: number }[];
  export const useDominantColor: (imageUrl: string) => number[] | null;
  export const useVideoDominantColor: (videoUrl: string, interval?: number) => { dominantColor: number[] | null, videoRef: React.RefObject<HTMLVideoElement> };
}
