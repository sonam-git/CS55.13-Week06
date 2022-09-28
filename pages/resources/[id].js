import { getResourceIds, getResourceData } from '../../lib/resources';

export async function getStaticProps({ params }) {
  const itemData = await getResourceData(params.id);
  // console.log(itemData);
  return {
    props: {
      itemData
    }
  };
}

export async function getStaticPaths() {
  const paths = await getResourceIds();
  // console.log(paths);
  return {
    paths,
    fallback: false
  };
}

export default function Entry({ itemData }) {
  console.log(itemData);
  return (
    <article className="card col-6">
      <div className="card-body">
        <h5 className="card-title">{itemData.data.name}</h5>
        <p className="card-text">{itemData.data.origin}</p>
        <p className="card-text">{itemData.data.year}</p>
        
        
      </div>
    </article>
  );
}