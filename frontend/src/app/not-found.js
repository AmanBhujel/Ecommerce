import Link from "next/link";

const PageNotFound = () => {
    return (
        <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
            <h3>404 Error.Page Not Found.</h3>
            <Link href={'/products'}>
                Go Back
            </Link>
        </div>
    )
}
export default PageNotFound;