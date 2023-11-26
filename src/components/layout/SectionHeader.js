export default function SectionHeader({ subHeader, mainHeader }) {
  return (
    <>
      <h3 className="text-gray-600 text-xl leading-3">{subHeader}</h3>
      <h2 className="text-customColorPrimaryDark font-bold text-4xl italic">
        {mainHeader}
      </h2>
    </>
  );
}
