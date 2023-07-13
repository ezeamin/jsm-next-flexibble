import Image from 'next/image';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  leftIcon?: string;
  rightIcon?: string;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
}

const Button = (props: ButtonProps) => {
  const {
    title,
    leftIcon,
    rightIcon,
    isSubmitting,
    bgColor,
    textColor,
    ...rest
  } = props;

  return (
    <button
      type={rest.type || 'button'}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3
      ${textColor || 'text-white'}
        ${
          isSubmitting
            ? 'bg-black/50 cursor-not-allowed'
            : bgColor || 'bg-primary-purple'
        } rounded-xl text-sm font-medium max-md:w-full
      `}
      onClick={rest.onClick}
    >
      {leftIcon && (
        <Image src={leftIcon} width={14} height={14} alt="Left icon" />
      )}
      {title}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="Left icon" />
      )}
    </button>
  );
};
export default Button;
