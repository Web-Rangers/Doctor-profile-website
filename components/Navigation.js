import styles from "styles/components/Navigation.module.css"
import Link from "next/link"
import { ReactSVG } from 'react-svg'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button } from 'components';
import Router from 'next/router';

import axios from 'axios';
import { useQuery, useMutation } from "@tanstack/react-query";

const links = [
    {
        img: "/images/icons/navigation/doctors.svg",
        href: "/",
        name: "Main"
    },
    {
        img: "/images/icons/navigation/doctors.svg",
        href: "/profile",
        name: "Profile"
    },
    {
        img: "/images/icons/navigation/orders.svg",
        href: "/orders",
        name: "Orders"
    },

]

export default function Navigation() {
    let router = useRouter()

    const sendRequest = async () => {
        return axios.post(`https://asclepius.pirveli.ge/asclepius/v1/api/payment/bog/checkout/orders`, {
            "intent": "AUTHORIZE",
            "items": [
                {
                    "amount": "0.01",
                    "description": "test",
                    "quantity": "1",
                    "product_id": "123456"
                }
            ],
            "locale": "ka",
            "shop_order_id": "123456",
            "redirect_url": "https://bog-banking.pirveli.ge/callback/statusChange",
            "show_shop_order_id_on_extract": true,
            "capture_method": "AUTOMATIC",
            "purchase_units": [
                {
                    "amount": {
                        "currency_code": "GEL",
                        "value": "0.01"
                    }
                }
            ]
        }).then((response) => {
            const redirect = response?.data.links.filter((item) => item.method == 'REDIRECT')[0];
            Router.push(redirect.href)
        });
    };

    const { mutate: request } = useMutation(() =>
        sendRequest()
    );

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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