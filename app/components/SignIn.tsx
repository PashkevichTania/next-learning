const loginUrl = `https://www.facebook.com/v16.0/dialog/oauth?client_id=${
  process.env.FACEBOOK_APP_ID
}&redirect_uri=${encodeURI(`${process.env.NEXTAUTH_URL}/api/auth/callback/facebook`)}`

function SignIn() {
  return (
    <div>
      <a href={loginUrl}>
        <span
          className="block w-max text-sm font-semibold tracking-wide
        text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base"
        >
          Continue with Facebook
        </span>
      </a>
    </div>
  )
}

export default SignIn
