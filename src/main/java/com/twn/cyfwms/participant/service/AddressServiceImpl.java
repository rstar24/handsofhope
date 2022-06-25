package com.twn.cyfwms.participant.service;

import com.twn.cyfwms.participant.entity.Address;
import com.twn.cyfwms.participant.repository.AddressRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AddressServiceImpl implements AddressService{
    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Address saveOrUpdateAddressData(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public Optional<Address> readAddressData(Long addressId) {
        return addressRepository.findById(addressId);
    }

    @Override
    public List<Address> searchAllByParticipant(Long participantId) {
        //ddressRepository.
        return null;
    }
}
