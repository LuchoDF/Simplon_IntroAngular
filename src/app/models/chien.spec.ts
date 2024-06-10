import { Chien } from './chien';

describe('Chien', () => {
  it('should create an instance', () => {
    expect(new Chien("nemo")).toBeTruthy();
  });

  it('test recuperation nom de chien', () => {
    const dogName = "Nemo";
    const myDog = new Chien(dogName);
    expect(myDog.name).toBeDefined();
    expect(myDog.name).not.toBeNull();
    expect(myDog.name).toBe(dogName);
  });

});



