
import React, { FC } from "react";
interface ICustomButton {
    color?: string;
    size?: string;
    disabled?: boolean;
    children: string;
    onClick?: () => void;
    className?: string;
    height?: string;
    width?: string;
    type: any;
}
const CustomButton: FC<ICustomButton> = (props) => {
    const { type, color, size, disabled, children, className, onClick, width, height } = props;
    return (
        <button
            type={type}
            style={{
                color: color,
                fontSize: size,
                height: height,
                width: width,
            }}
            className={"btn btn-primary" || className}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default CustomButton;
