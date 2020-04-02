import React from 'react';
import styled from 'styled-components';
import Static from './examples/Static';
import Interactive from './examples/Interactive';

const Header = styled.header`
  padding: 20px 0;
  margin-top: 30px;
  background-color: #333;
  color: white;
`;

const Main = styled.div`
  font-family: 'Courier New', Courier, monospace;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-decoration: underline;
  margin-top: 0;
`;

const SectionTitle = styled.h2`
  font-weight: bold;
  text-decoration: underline;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <Main>
      <Header>
        <Logo>Ture</Logo>
        <small>a TypeScript data structures and algorithms library written for fun.</small>
      </Header>

      <SectionTitle>KdTree tests</SectionTitle>
      <Container>
        <Interactive />
        <Static />
      </Container>
    </Main>
  );
}

export default App;
