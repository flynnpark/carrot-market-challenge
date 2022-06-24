import Image from 'next/image';
import Link from 'next/link';
import { BillionItem } from 'types/api';

function BillionCard({ id, name, squareImage, industries }: BillionItem) {
  return (
    <Link href="/person/[id]" as={`/person/${id}`}>
      <a>
        <Image
          src={
            squareImage.indexOf('undefined') === -1
              ? squareImage
              : 'https://specials-images.forbesimg.com/imageserve/6050f48ca1ab099ed6e290cc/416x416.jpg?background=000000&cropX1=0&cropX2=800&cropY1=0&cropY2=800'
          }
          alt={name}
          width={200}
          height={200}
        />
        <h1>{name}</h1>
        <h2>
          {industries.map((industry) => (
            <span key={industry}>{industry}</span>
          ))}
        </h2>
      </a>
    </Link>
  );
}

export default BillionCard;
