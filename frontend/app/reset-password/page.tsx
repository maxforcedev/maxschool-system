import ResetPasswordPage from "../../reset-password"

interface Props {
  searchParams: Record<string, string | string[] | undefined>
}

export default function Page({ searchParams }: Props) {
  const token = typeof searchParams.token === "string" ? searchParams.token : ""

  return <ResetPasswordPage token={token} />
}
