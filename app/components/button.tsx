import { useRouter } from 'next/router';

const Button = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/app/page-card/page.tsx');
  };

  return (
    <button onClick={handleClick} className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Go to Another Page
    </button>
  );
};

export default Button;
