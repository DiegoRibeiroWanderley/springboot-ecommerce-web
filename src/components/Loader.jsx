import { TailSpin } from "react-loader-spinner"

const Loader = ({text}) => {
    return (
        <div className="flex justify-center items-center w-full h-112.5">
            <div className="flex flex-col items-center gap-1">
                <TailSpin
                    visible={true}
                    height="80"
                    width="80"
                    color="#e91e63"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""/>
                    <p className="text-pink-400"><strong>{text ? text : "Please wait..."}</strong></p>
            </div>
        </div>
    )
}

export default Loader