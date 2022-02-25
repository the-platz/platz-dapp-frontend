import { FC } from "react"

type INotFoundProps = {
    errMsg: string
}

const NotFound: FC<INotFoundProps> = ({ errMsg }) => {
    return (
        <>Not found
            <p>{errMsg}</p>
        </>
    )
}

export default NotFound