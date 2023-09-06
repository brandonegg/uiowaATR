export const FieldLabel = ({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) => {
  return (
    <div>
      <label className="text-md block font-semibold">{heading}</label>
      <span className="block text-sm italic text-neutral-400">
        {subheading}
      </span>
    </div>
  );
};
