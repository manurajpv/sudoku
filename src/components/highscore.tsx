import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const HighScores = () => {
  const scores = JSON.parse(localStorage.getItem('sudoku-scores') || '[{"difficulty":"Complete a game to view your score..", "time": "No data found..."}]')
  console.log(scores)
  return (
    <Table>
      <TableCaption>Your Previus Games</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead >No.</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Difficulty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores && scores.map((score: { difficulty: string, time: string }, index: number) => (
          <TableRow key={index+1}>
            <TableCell className="font-medium">{index+1}</TableCell>
            <TableCell>{score.time}</TableCell>
            <TableCell className="text-right">{score.difficulty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default HighScores