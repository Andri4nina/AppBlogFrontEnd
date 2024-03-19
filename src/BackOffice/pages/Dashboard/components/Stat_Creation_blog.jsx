import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Stat_Creation_blog = () => {
  const [blogStats, setBlogStats] = useState([]);
/*   const [visitorStats, setVisitorStats] = useState([]); */
  useEffect(() => {
      // Fonction pour récupérer les statistiques de blog depuis l'API
      const fetchBlogStats = async () => {
          try {
              const response = await axios.get('http://localhost:3000/blog/comparaison/AllBlog');
              setBlogStats(response.data);
          } catch (error) {
              console.error('Erreur lors de la récupération des statistiques de blog:', error);
          }
      };

  /*     // Fonction pour récupérer les statistiques de visiteurs depuis l'API (si nécessaire)
      const fetchVisitorStats = async () => {
          try {
              const response = await axios.get('URL_DE_VOTRE_API_POUR_RECUPERER_LES_STATISTIQUES_DE_VISITEURS');
              setVisitorStats(response.data);
          } catch (error) {
              console.error('Erreur lors de la récupération des statistiques de visiteurs:', error);
          }
      }; */

      fetchBlogStats();
  /*     fetchVisitorStats();  */
  }, []);



  return (
    <>
      <div className="shadow-lg p-5 w-full lg:w-4/6 dash-card mb-2"> 
                <div className="mb-5 block sm:flex gap-2">
                    <div className="sm:w-2/3 sm:border-r ">
                    <h3 className="font-semibold text-base mb-5">Statistique de blog</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart
                          data={blogStats}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="creations" fill="#8884d8" />
                          <Bar dataKey="publications" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>     
                    </div>
                    <div className="mx-auto w-1/3 relative">
                    <h3 className="font-semibold text-base mb-5">Statistique de Visiteur</h3>
                    <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                /* data={data2} */
                                cx="50%"
                                cy="50%"
                                outerRadius={60}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name }) => name}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        <span className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base">75%</span>
                      
    
                        <div className="mt-10 flex justify-center gap-2">
                            <div className="flex items-center justify-center gap-2">
                                <div className=" dash-icon">
                                    <i className="text-gray-500 bx bxs-group"></i>
                                </div>
                                <p className="text-sm">Commentaire</p>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="dash-icon">
                                    <i className="text-skin-color1 bx bxs-group"></i>
                                </div>
                                <p className="text-sm">Passage</p>
                            </div>
                        </div>
                    </div>
                </div>       
        </div>
    </>
  )
}

export default Stat_Creation_blog
