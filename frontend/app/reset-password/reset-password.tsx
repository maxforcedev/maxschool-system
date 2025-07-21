import ResetPasswordPage from "./reset-password"

export default function Page({ searchParams }: { searchParams: { token?: string } }) {
  const token = searchParams.token

  return <ResetPasswordPage token={token} />
}