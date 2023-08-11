import {GetServerSideProps} from "next";
import {withHandleError} from "@/share/lib/apiService";
import {GetServerSidePropsContextWithUser, withUser} from "@/entities/user";

type A = GetServerSideProps

export const appGetServerSideProps = (getServerSideProps: (ctx: GetServerSidePropsContextWithUser) => Promise<any>) => withUser(withHandleError(getServerSideProps as unknown as GetServerSideProps))