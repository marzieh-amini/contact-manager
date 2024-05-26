import spinner from "../assets/Spinner.gif";
const Spinner = () => {
  return (
    <>
      <img
        className="d-block m-auto"
        src={spinner}
        style={{ width: "200px" }}
        alt="spinner"
      />
    </>
  );
};
export default Spinner;
