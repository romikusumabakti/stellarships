export default function Button({ variant = "filled", className, ...props }) {
  return (
    <button
      className={`button bg-blue-500 h-10 px-6 text-sm font-bold text-white hover:bg-blue-600 rounded-full ${
        variant && `button-${variant}`
      } ${className}`}
      {...props}
    />
  );
}
