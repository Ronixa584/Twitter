interface SignInFallbackProps {
  message?: string;
}

const SignInFallback = ({
  message,
}: SignInFallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 text-white p-6">
      <div className="text-6xl mb-4">😕</div>
      <h1 className="text-2xl font-bold mb-2">Oops! Sign In Required</h1>
      <p className="text-gray-400 text-center mb-6">
        {message ||
          "You need to sign in to view this content. Join the conversation and see what's happening!"}
      </p>
    </div>
  );
};

export default SignInFallback;
