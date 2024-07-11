import { PROJECT_NAME } from "@/utils/globals"

const Header = () => {
    return (
        <div className="p-4 text-center border-b font-bold">
            <h1>{PROJECT_NAME}</h1>
        </div>
    )
}


export default Header