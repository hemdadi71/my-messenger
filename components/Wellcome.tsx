
const data: any = [
  { style: { '--i': 1 }, word: 'W' },
  { style: { '--i': 2 }, word: 'e' },
  { style: { '--i': 3 }, word: 'l' },
  { style: { '--i': 4 }, word: 'l' },
  { style: { '--i': 5 }, word: 'c' },
  { style: { '--i': 6 }, word: 'o' },
  { style: { '--i': 7 }, word: 'm' },
  { style: { '--i': 8 }, word: 'e' },
  { style: { '--i': 9 }, word: '' },
  { style: { '--i': 10 }, word: '' },
  { style: { '--i': 11 }, word: '' },
  { style: { '--i': 12 }, word: '' },
]
const Wellcome = () => {
  return (
    <p className="font-bebas waving font-semibold pointer-events-none text-[6em]">
      {data.map((item: any, index: number) => (
        <span style={item.style} key={index}>
          {item.word}
        </span>
      ))}
    </p>
  )
}

export default Wellcome
