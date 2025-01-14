'use client'
import { useParams } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const cluster = params.cluster;

  return <div>My Post: {cluster}</div>;
}