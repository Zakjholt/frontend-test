import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const BackButton = styled.button`
  background: #fff;
  border-radius: 5px;
  align-self: flex-start;
  font-size: 15px;
  cursor: pointer;
`;

const ArchiveButton = BackButton.extend`
  flex: 0 1 100%;
  padding: 10px 20px;
  background: #f0ad4e
  align-self: center;
  color: white;
`;

const FieldLabel = styled.span`
  font-weight: bold;
`;

const FieldValue = styled.span`
  font-weight: light;
`;

const FieldContainer = styled.div`
  margin: 15px 0;
  flex: 0 1 100%;
`;

const Field = ({ label, value }) => (
  <FieldContainer>
    <FieldLabel>{label}: </FieldLabel>
    <FieldValue>{value}</FieldValue>
  </FieldContainer>
);

export default ({ call, updateCall, goBack }) => (
  <DetailsContainer>
    <BackButton onClick={goBack}>&larr;</BackButton>
    <Field label="From" value={call.from} />
    <Field label="To" value={call.to} />
    <Field label="Duration" value={call.duration} />
    <Field label="Start Time" value={call.created_at.toLocaleString()} />
    <Field label="Via" value={call.via} />
    <Field label="Direction" value={call.direction} />
    <Field label="Result" value={call.call_type} />
    <Field label="Stats" value={call.is_archived ? 'archived' : 'active'} />
    <ArchiveButton onClick={() => updateCall({ is_archived: true })}>
      ♺
    </ArchiveButton>
  </DetailsContainer>
);
