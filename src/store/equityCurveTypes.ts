export interface EquityCurveState {
  startingBalance: number
  winProbability: number
  riskPercent: number
  rewardRatio: number
  itemsPerSequence: number
  numSequences: number
  sequences: TradeResult[][]
}

export enum TradeResult {
  Loss = 'LOSS',
  Win = 'WIN',
}

export interface EquityCurveItem {
  result: TradeResult
  pnl: MultiFormatStatItem
  balance: MultiFormatStatItem
}

export interface MultiFormatStatItem {
  rMultiples: number
  dollars: number
  percent: number
}

export interface EquityCurveStats {
  maxConsecutiveLosses: number
  maxConsecutiveWins: number
  avgExpectancy: MultiFormatStatItem
  maxDrawdown: MultiFormatStatItem
  avgReturn: MultiFormatStatItem
  maxReturn: MultiFormatStatItem
  minReturn: MultiFormatStatItem
}
