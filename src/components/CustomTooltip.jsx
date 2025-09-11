export const CustomTooltip = ({ active, payload, label, isPie }) => {
  const isVisible = active && payload && payload.length;
  return (
    <div className="text-mainblue rounded-lg p-4 border bg-whiteprime/80" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
         <>
            <p className="font-bold text-xl">{`${isPie ? payload[0].name : label}`}</p>
            <p className="font-medium text-sm">{`Jumlah: ${payload[0].value}`}</p>
         </>
      )}
    </div>
  );
};