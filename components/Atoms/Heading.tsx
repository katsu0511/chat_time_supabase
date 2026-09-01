export default function Heading(props: {title: string}) {
  return <h2 className='text-2xl font-bold text-[color:var(--color-primary)] text-center mb-10'>{props.title}</h2>;
}
