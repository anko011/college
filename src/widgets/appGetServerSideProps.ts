import {GetServerSideProps} from "next";
import {withHandleError} from "@/share/lib/apiService";
import {GetServerSidePropsContextWithUser, withUser} from "@/entities/user";


export const appGetServerSideProps = (getServerSideProps: (ctx: GetServerSidePropsContextWithUser) => Promise<any>) => withHandleError(withUser(getServerSideProps as GetServerSideProps))