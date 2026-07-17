// Format: "DD.MM"
export type DateString = string;
export type SelectedShares = Set<string>;
export type UsagePeriod = [DateString, DateString];

export interface ShareUnit {
  [shareId: string]: UsagePeriod[];
}
