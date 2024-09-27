import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

export default function FormElement({ onClose, ajouterEmploye, supprimerEmploye, modifierEmploye, employeAmodifier }) {
  const [departement, setDepartement] = useState([]);

  const fetchDepartement = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/department/getDepartements');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des départements');
      }
      const data = await response.json();
      setDepartement(data);
      console.log(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des départements :', error);
    }
  };

  useEffect(() => {
    fetchDepartement();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nom = e.target.elements['nom'].value;
    const prenom = e.target.elements['prenom'].value;
    const CIN = e.target.elements['CIN'].value;
    const email = e.target.elements['email'].value;
    const Adresse = e.target.elements['Adresse'].value;
    const nomDepartement = e.target.elements['departement'].value;
    const role = e.target.elements['role'].value;

    const employeData = { nom, prenom, CIN, email, Adresse, departement: nomDepartement, role };

    if (employeAmodifier) {
      modifierEmploye({ _id: employeAmodifier._id, ...employeData });
    } else {
      ajouterEmploye(employeData);
    }
    onClose();
  };

  useEffect(() => {
    if (employeAmodifier) {
      document.getElementById('nom').value = employeAmodifier.nom || '';
      document.getElementById('prenom').value = employeAmodifier.prenom || '';
      document.getElementById('CIN').value = employeAmodifier.CIN || '';
      document.getElementById('email').value = employeAmodifier.email || '';
      document.getElementById('Adresse').value = employeAmodifier.Adresse || '';
      document.getElementById('departement').value = employeAmodifier.departement || '';
      document.getElementById('role').value = employeAmodifier.role || '';
    }
  }, [employeAmodifier]);

  const handleSupprimer = () => {
    if (employeAmodifier) {
      supprimerEmploye(employeAmodifier._id);
      onClose();
    } else {
      console.error('Erreur : Aucun employé à supprimer');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">
              <strong>Employé</strong>
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div className="md:col-span-5">
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" name="nom" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="CIN">CIN</label>
                <input type="text" id="CIN" name="CIN" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="Adresse">Adresse</label>
                <input type="text" id="Adresse" name="Adresse" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50" />
              </div>
              <div className="md:col-span-5">
                <label htmlFor="departement">Département</label>
                <select id="departement" name="departement" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50">
                  {departement.map((dep) => (
                    <option key={dep._id} value={dep.nomDepartement} selected={dep._id === employeAmodifier?.departement._id}>
                      {dep.nomDepartement}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-5">
                <label htmlFor="role">Rôle</label>
                <select id="role" name="role" className="h-8 border mt-1 rounded px-4 w-full bg-gray-50">
                  {['moderator', 'employee'].map((role) => (
                    <option key={role} value={role} selected={role === employeAmodifier?.role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 text-right mb-4 lg:mb-0">
            <div className="flex justify-between">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base">
                {employeAmodifier ? 'Modifier' : 'Ajouter'}
              </button>
              {employeAmodifier && (
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
                  onClick={handleSupprimer}
                >
                  Supprimer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
