const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      {children}
    </div>
  );
};

export default Card;