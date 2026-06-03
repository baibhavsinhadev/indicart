import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="bg-primary/10 px-6 md:px-16 lg:px-24 xl:px-32 mt-24">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="h-8 md:h-9" loading="lazy" src={assets.logo} alt="logo" />
                    <p className="max-w-102.5 mt-6">We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.</p>
                </div>

                <div className="flex flex-wrap justify-between w-3/8 space-y-5">
                    {footerLinks.map((footerLink, index) => (
                        <div key={index}>
                            <h2 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{footerLink.title}</h2>

                            <ul className="text-sm space-y-1">
                                {footerLink.links.map((link, index) => (
                                    <li key={index}><a href={link.url}>{link.text}</a></li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <p className="py-4 text-center text-sm md:text-base">Copyright {new Date().getFullYear()} © <span className="text-primary-dull">GreenCart</span>. All Right Reserved.</p>
        </footer>
    );
};

export default Footer;