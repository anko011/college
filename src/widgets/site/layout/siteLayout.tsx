import {ComponentType, PropsWithChildren, ReactElement, ReactNode} from "react";
import cs from 'classnames'
import ErrorBoundary from "@/share/client/components/error-boundary";
import classes from './styles.module.scss'
import {RightMenu} from "@/widgets/site/layout/rightMenu";
import {InteractSection} from "@/widgets/site/layout/interactSection";
import {Footer} from "@/widgets/site/layout/footer";
import {SubFooter} from "@/widgets/site/layout/subFooter";
import {LeftMenuSection} from "@/widgets/site/layout/leftMenuSection";
import {Header} from "@/widgets/site/layout/header";
import colors from './colors.module.scss'
import {Notification} from "@/share/client/components/site";
import {LeftMenu} from "@/widgets/site/layout/leftMenuSection/leftMenu";

import {headerMenu, leftMenu, rightMenu} from "../../../../mock";
import {HeaderMenu} from "@/widgets/site/layout/header/headerMenu";

export function SiteLayout({children}: PropsWithChildren) {

    return (
        <div className={cs(classes.root, colors.root)} id="site-context">
            <LeftMenuSection className={classes.leftNavigation}>
                {(isOpenDrawer) => <LeftMenu data={leftMenu} isCompact={isOpenDrawer}/>}
            </LeftMenuSection>
            <Header className={classes.header}>
                <HeaderMenu navigationData={headerMenu}/>
            </Header>

            <div className={cs(classes.content, classes.contentSection)}>
                <main className={classes.pageContent}>
                    {children}
                </main>

                <div className={classes.rightSection}>
                    <InteractSection/>
                    <RightMenu menuData={rightMenu}/>
                </div>
            </div>

            <Footer className={classes.footer}/>

            <div className={classes.additional}>
                <SubFooter/>
            </div>
        </div>
    )
}


export const withSiteLayout = (Page: ComponentType<any>) => {
    const PageWithLayout = Page as ComponentType & { getLayout?: (page: ReactElement) => ReactNode }

    PageWithLayout.getLayout = (page) => (
        <ErrorBoundary>
            <Notification/>
            <SiteLayout>
                {page}
            </SiteLayout>
        </ErrorBoundary>
    )

    return PageWithLayout
}
