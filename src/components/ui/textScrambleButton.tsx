import { Button, buttonVariants } from './button';
import { LockKeyholeIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * A button that scrambles the text on hover
 *
 * @example
 * ```ts
 * <TextScrambleButton text="Encrypt my data" />
 * ```
 */
const TextScrambleButton = ({
  characters = '!@#$%^&*():{};|,.<>/?',
  className,
  scrambleCycles = 2,
  shuffleTime = 60,
  targetText = 'Secure thing'
}: {
  /** a string of characters to use for scrambling */
  characters?: string;
  className?: string;
  /** amount of times to scramble the text per character */
  scrambleCycles?: number;
  /** time in ms to scramble the text */
  shuffleTime?: number;
  /** the button text to scramble on hover */
  targetText?: string;
}) => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const [text, setText] = useState(targetText);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = targetText
        .split('')
        .map((char, index) => {
          if (pos / scrambleCycles > index) {
            return char;
          }
          const randomCharIndex = Math.floor(Math.random() * characters.length);
          const randomChar = characters[randomCharIndex];

          return randomChar;
        })
        .join('');

      setText(scrambled);
      pos++;

      if (pos >= targetText.length * scrambleCycles) {
        stopScramble();
      }
    }, shuffleTime);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(targetText);
  };

  return (
    <Button
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      size="lg"
      variant="destructive"
      className={cn(
        'relative group overflow-clip font-mono font-semibold',
        className
      )}
    >
      <span className="relative z-10 flex items-center gap-4">
        <LockKeyholeIcon className="h-6 w-6" />
        <span className="text-lg">{text}</span>
      </span>
    </Button>
  );
};

export { TextScrambleButton };
