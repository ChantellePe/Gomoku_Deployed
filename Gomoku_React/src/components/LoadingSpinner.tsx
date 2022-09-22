import style from './LoadingSpinner.module.css'
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from 'react-loader-spinner'

export default function LoadingSpinerComponent() {
    const { promiseInProgress } = usePromiseTracker();

    const threeDots = () => {
        return (
            <ThreeDots
                height="80"
                width="80"
                radius="9"
                color="#d60096"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                visible={true}
            />
        )
    }

    return (
        promiseInProgress === true ?
            <div className={`${style.container}`}>
                <p className={`${style.header}`}>Loading...please wait</p>
                {threeDots()}
            </div>
            :
            null
    )
}