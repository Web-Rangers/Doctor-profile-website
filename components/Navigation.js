import styles from "styles/components/Navigation.module.css"
import Link from "next/link"
import { ReactSVG } from 'react-svg'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const links = [
    {
        img: "/images/icons/navigation/cards.svg",
        href: "/cards",
        name: "Cards"
    },
    {
        img: "/images/icons/navigation/users.svg",
        href: "/users",
        name: "Users"
    },
    {
        img: "/images/icons/navigation/orders.svg",
        href: "/orders",
        name: "Orders"
    },
    {
        img: "/images/icons/navigation/clinics.svg",
        href: "/clinics",
        name: "Clinics"
    },
    {
        img: "/images/icons/navigation/doctors.svg",
        href: "/doctors",
        name: "Doctors"
    },
    {
        img: "/images/icons/navigation/settings.svg",
        href: "/settings",
        name: "Settings"
    },
]

export default function Navigation() {
    let router = useRouter()

    return (
        <div className={styles.container}>
            {links.map((link, index) => {
                return (
                    <MenuLink
                        key={index}
                        router={router}
                        {...link}
                    />
                )
            })}
        </div>
    )
}

function MenuLink({ img, href, name, router }) {
    const [active, setActive] = useState(false)

    useEffect(() => {
        setActive(href != '/' ? location.pathname.includes(href) : location.pathname == href)
    }, [router])

    return (
        <Link href={href}>
            <a>
                <div className={`${styles.link} ${active && styles.active}`}>
                    {img &&
                        <ReactSVG
                            src={img}
                            className={styles.linkImg}
                        />
                    }
                    <span>
                        {name}
                    </span>
                </div>
            </a>
        </Link>
    )
}