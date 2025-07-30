import styled from "@emotion/native";

const RECORDS = {
  distance: 5,
  time: 35,
  pace: `9'10"`,
};

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #27272a;
`;

const RecordItem = styled.View`
  align-items: center;
  flex: 1;
  padding: 12px;
  border-right-width: 1px;
  border-right-color: #27272a;
`;

const RecordItemLabel = styled.Text`
  color: #a0a0a0;
  font-size: 12px;
  font-weight: 400;
`;

const RecordItemValue = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

export function RecordView() {
  return (
    <Container>
      <RecordItem>
        <RecordItemValue>{RECORDS.distance} km</RecordItemValue>
        <RecordItemLabel>Distance</RecordItemLabel>
      </RecordItem>
      <RecordItem>
        <RecordItemValue>{RECORDS.pace}</RecordItemValue>
        <RecordItemLabel>Pace</RecordItemLabel>
      </RecordItem>
      <RecordItem>
        <RecordItemValue>{RECORDS.time}</RecordItemValue>
        <RecordItemLabel>Time</RecordItemLabel>
      </RecordItem>
    </Container>
  );
}
