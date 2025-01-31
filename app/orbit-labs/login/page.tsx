import type { NextPage } from 'next';
import OrbitLabsLogin from '../login/page';

const LoginPage: NextPage = () => {
  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-900">
      <OrbitLabsLogin />
    </main>
  );
};

export default LoginPage;