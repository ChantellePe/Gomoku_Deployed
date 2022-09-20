import style from './LoadingSpinner.module.css'
import { usePromiseTracker } from "react-promise-tracker";
import { ThreeDots } from 'react-loader-spinner'


export default function LoadingSpinerComponent() {
    const { promiseInProgress } = usePromiseTracker();


    // (location.pathname === `game/${id}`) ? `${style.loadingGame}` : `${style.loadingGames}`

    return (
        <div className={`${style.loadingGame}`}>
            {
                (promiseInProgress === true) ?
                    <ThreeDots
                        height="80"
                        width="80"
                        radius="9"
                        color="#d60096"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        visible={true}
                    />
                    :
                    null
            }
        </div>
    )
};