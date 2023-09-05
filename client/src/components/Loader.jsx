import { Grid } from "react-loader-spinner";

const Loader = ({ status }) => {
    return (
        <Grid
            height="80"
            width="80"
            color="#2C2C2C"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass=""
            visible={status}
        />
    )
}

export default Loader