export default function Loading() {
  return (
    <div
      className="w-full flex justify-center items-center"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <style jsx>{`
        .loader {
          border: 16px solid #999999;
          border-top: 16px solid #bab7b7;
          border-radius: 50%;
          width: 120px;
          height: 120px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
      <div className="loader" />
    </div>
  );
}
