import React from "react"

const Button = ({
  children,
  type = "button",
  bgColor = "bg-blue-500",
  hoverColor = "hover:bg-blue-700",
  textColor = "text-white",
  fontBold = "font-bold",
  py = "py-2",
  px = "px-4",
  rounded = "rounded",
  className = "",
  ...props
}) => {
  return (
  <button className={`px-4 py-2 ${bgColor} ${hoverColor} ${textColor} ${fontBold} ${py} ${px} ${rounded} ${className}`} {...props}>{children}</button>
  )
}

export default Button
