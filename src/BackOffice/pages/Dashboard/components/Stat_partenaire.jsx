import React, { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const Stat_partenaire = () => {
  const [partenairesData, setPartenairesData] = useState([]);

  useEffect(() => {
      fetchPartenairesData();
  }, []);

  const fetchPartenairesData = async () => {
      try {
          const response = await fetch('http://localhost:3000/partenaire/countEconomique/part');
          const countEconomique = await response.json();
          const response1 = await fetch('http://localhost:3000/partenaire/countEducation/part');
          const countEducation = await response1.json();
          const response2 = await fetch('http://localhost:3000/partenaire/countCommunautaire/part');
          const countCommunautaire = await response2.json();
          
          setPartenairesData([
              { name: 'Economique', value: countEconomique },
              { name: 'Education', value: countEducation },
              { name: 'Communautaire', value: countCommunautaire },
             
          ]);
      } catch (error) {
          console.error('Error fetching partenaires data:', error);
      }
  };

  const COLORS = ['#0088FE', '#FFBB28', '#00C49F'];

    
  return (
    <>
      <div className="sm:w-1/3 p-5 shadow-lg mb-2 h-96">
                <h3 className="text-sm mb-5 font-semibold">Nombre de nos partenaires</h3>
                <div className="mb-5 flex justify-center items-center gap-2">
                   
                    <div className="-translate-y-16 relative ">
                    <ResponsiveContainer width={400} height={400}>
                          <PieChart>
                            <Pie
                              data={partenairesData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(2)}%`}
                            >
                              {partenairesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
               
        </div>
    </>
  )
}

export default Stat_partenaire
