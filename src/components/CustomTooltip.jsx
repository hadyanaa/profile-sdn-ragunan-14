export const CustomTooltip = ({ active, payload, label, isPie }) => {
  const isVisible = active && payload && payload.length;
  return (
    <div className="text-mainblue rounded-lg p-4 border bg-whiteprime/80" style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
      {isVisible && (
         <>
            {payload.length === 1 ? ( 
                <>
                  <p className="font-bold text-xl">{`${isPie ? payload[0].name : label}`}</p>
                  <p className="font-medium text-sm">{`Jumlah: ${payload[0].value}`}</p>
                </>
              ) : (
              <>
                <p className="font-bold text-xl">{`${isPie ? payload[0].name : label}`}</p>
                <p className="font-medium text-sm">{`Jumlah Laki-laki: ${payload[0].value}`}</p>
                <p className="font-medium text-sm">{`Jumlah Perempuan: ${payload[1].value}`}</p>
                <p className="font-medium text-sm">{`Jumlah Siswa: ${payload[0].value + payload[1].value}`}</p>
                <p className="font-medium text-sm">{`Kuota: ${32 - (payload[0].value + payload[1].value)}`}</p>
              </>
              )}
         </>
      )}
    </div>
  );
};