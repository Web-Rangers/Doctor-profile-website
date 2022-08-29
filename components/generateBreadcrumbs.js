import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from 'styles/components/breadcrumbs.module.scss';

export default function GenerateBreadcrumbs() {
    const pageTitles = {}
    
    const router = useRouter();
    const [breadcrumb, setBreadCrumb] = useState([]);
    function generateBreadcrumbs() {
        const asPathWithoutQuery = router?.asPath;
        const trueRoute = router?.pathname;
    
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
            .filter(v => v.length > 0);
    
        const trueRoutes = trueRoute.split("/").filter(v => v.length > 0);
    
        let crumblist = asPathNestedRoutes.map((subpath, idx) => {
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            const title = pageTitles[href];
            const trueTitle = trueRoutes[idx]?.substring(trueRoutes[idx].lastIndexOf('/') + 1)
            if (trueTitle) {
                if(trueTitle.includes('detailed')){
                    let xhref = href + asPathNestedRoutes[idx + 1];
                    return { href: xhref, title}
                }
                return { href, title };
            }
            else {
                if (title)
                    return { href, title };
            }
        })
        crumblist = crumblist.filter(n => n)
        return [
            ...crumblist.map(crumb => (
                {
                    href: crumb.href,
                    title: crumb.title ?
                        crumb.title
                        : 
                        crumb.href.substring(crumb.href.lastIndexOf('/') + 1)
                }
            ))
        ];
    }

    useEffect(()=> {
        const breadcrumbs = generateBreadcrumbs();
        setBreadCrumb(breadcrumbs)
    },[])


    return  <>
        <div className={styles.breadcrumbs}>
            {breadcrumb?.map((item)=>{
                return <>
                        <Link href={item.href}>
                            {item.title.includes('?') ? 
                                item.title.split('?')[0].replace('_', ' ') : 
                                item.title
                            }
                        </Link>
                    </>
                })
            }   
        </div>   
    </>
}