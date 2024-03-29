import React from "react"

const Footer = () => {
    return (
        <footer className="page-footer green">
            <div className="footer-copyright">
                <div className="container">
                    © {new Date().getFullYear()} Copyright Text
                    <a
                        className="grey-text text-lighten-4 right"
                        href="https://github.com/saroyangor/react-shop/tree/master"
                    >
                        Repo
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
